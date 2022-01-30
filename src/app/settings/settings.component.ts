import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MfaService } from 'app/_services/mfa.service';
declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private mfaService: MfaService, private fb: FormBuilder) { }
  url = "yes";
  verifyForm = this.fb.group({
    mfaCode: [, Validators.required],
    mfaSecret: [],
    actDeact: []
  })
  enabled: boolean;
  secretkey;
  ngOnInit() {
    this.isEnabled();
  }

  isEnabled() {
    this.mfaService.isMFAEnabled().subscribe(
      content => {
        if (content['result'] == false) {
          this.mfaService.getSecret().subscribe(
            content => {
              this.url = content['data']
              this.secretkey = this.url.split("=")[1].split("&")[0]
            }
          );
        }
        else {
          this.enabled = true;
        }
      }
    )
  }
  onVerify() {
    this.verifyForm.markAllAsTouched()
    if (this.verifyForm.invalid) {
      this.showNotification('bottom', 'right', 'Please Enter the MFA Code', 'warning')
    }
    else {
      if (this.enabled == true) {
        this.verifyForm.patchValue({ mfaSecret: this.secretkey, actDeact: true });
        this.mfaService.actdeactmfa(this.verifyForm.value).subscribe
          (
            content => {
              this.showNotification('bottom', 'right', 'MFA successfully deactivated', 'success')
              this.enabled = false;
              this.verifyForm.reset()
              this.mfaService.getSecret().subscribe(
                content => {
                  this.url = content['data']
                  this.secretkey = this.url.split("=")[1].split("&")[0]
                }
              );
            }
          )
      }
      else {
        this.verifyForm.patchValue({ mfaSecret: this.secretkey, actDeact: false });
        this.mfaService.actdeactmfa(this.verifyForm.value).subscribe
          (
            content => {
              this.showNotification('bottom', 'right', 'MFA successfully activated', 'success')
              this.enabled = true;
              this.verifyForm.reset()
            }

          )
      }
    }
  }

  showNotification(from, align, message, color) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: color,
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
