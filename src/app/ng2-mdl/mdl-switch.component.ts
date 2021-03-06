// Imports from @angular
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Input, Output, Component, forwardRef } from '@angular/core';
import { EventEmitter, HostListener } from '@angular/core';
// Services
import { MdlService } from './mdl.service'

export const MDL_SWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdlSwitchComponent),
  multi: true
};
@Component({
  selector: 'mdlSwitch, mdl-switch, md-slide-toggle',
  template: `
  <label
    mdl [class.is-checked]="checked"
    class="mdl-switch mdl-js-switch"
    [ngClass]="{'mdl-js-ripple-effect': ripple}"
  >
    <input #inp type="checkbox" class="mdl-switch__input"
      [checked]="checked" [ngClass]="class" [disabled]="disabled"
      (blur)="onTouched()" (change)="update(inp.checked)"
    />
    <span class="mdl-switch__label">{{placeholder}}</span>
  </label>
  `,
  providers: [MDL_SWITCH_VALUE_ACCESSOR]
})
export class MdlSwitchComponent implements ControlValueAccessor {
  @Input() ripple: boolean = MdlService.rippleEffect;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() placeholder: string;
  @Input() class: string;
  @Input() label: string;
  @Output() changes = new EventEmitter();

  ngOnChanges() {
    if(this.label) this.placeholder = this.label;
  }

  update(checked) {
    this.checked = checked;
    this.changes.emit(checked);
  }

  // Needed to properly implement ControlValueAccessor.
  @HostListener('changes', ['$event'])
  onChange = (_) => { console.log(); };
  @HostListener('blur', ['$event'])
  onTouched = () => { console.log(); };
  writeValue(checked: any): void { this.checked = checked; }
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
