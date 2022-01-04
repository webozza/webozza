import { Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { UploadOutput } from './interface';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
// import { GET_USER } from '../../globals/_classes/functions';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  endPoint = environment.api_url;
  filesToUpload: Array<any> = [];
  imagePreview: Array<any> = [];
  domRemove = null;
  domHover = null;
  drop = null;
  progress = null;
  output: UploadOutput;
  filesPreview: any[] = [];

  @ViewChild('hasAlert') alertContainer: ElementRef;

  @Input('multi') multi: boolean; // true = multi image false = single image
  @Input('width') width: number; // preview width optional
  @Input('height') height: number; // preview height optional
  @Input('url') url: string; // upload url
  @Input('fileName') fileName: string; // file name by default 'file' - single 'file[]' - multi
  // tslint:disable-next-line:no-input-rename
  @Input('info') data: any; // data to send with files optional
  @Input('accept') accept: any; // accept files
  @Input('limit') limit: any;
  // tslint:disable-next-line:no-input-rename
  @Input('uploadBtn') uBtn: string; //  optional
  // tslint:disable-next-line:no-input-rename
  @Input('resetBtn') rBtn: string; //  optional
  @Output('upload') upload: EventEmitter<any> = new EventEmitter(); // triger upload method to show alert


  constructor(
    private _rootNode: ElementRef,
    private alert: AlertService,
    private auth: AuthService,
    private fServ: FileUploadService
  ) {
    this.url = this.endPoint + this.url;
  }

  ngOnInit() {
    this.dragDropEffect();
  }

  // Drag and Drop effect 
  dragDropEffect() {
    this.drop = $(this._rootNode.nativeElement).find("input#images");
    this.drop.on('dragenter', function (e) {
      $(".drop").addClass("dropHover");
      $('.drop').css('border-color', '#398bf7');
    }).on('dragleave dragend mouseout drop', function (e) {
      $(".drop").removeClass("dropHover");
      $('.drop').css('border-color', '#DADFE3');
    });

    $('.drop').hover(function () {
      $(this).addClass("dropHover");
    }, function () {
      $(this).removeClass("dropHover");
    });

  }

  inputFile(f) {
    let fileList = f.target.files;
    if (fileList) {
      if (this.multi) {
        this.multiFile(fileList);
      } else {
        this.clear();
        this.imageView(fileList[0]);
      }
    }
    f.target.value = '';
  }

  multiFile(file) {
    for (let i of file) {
      this.imageView(i);
    }
  }

  imageView(i) {
    let size = this.fServ.checkFileSize(i, this.limit || 2);
    if (size) {
      this.filesToUpload.push(i);
      if (this.checkImage()) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview.push(reader.result);
        };
        reader.readAsDataURL(i);
      } else {
        let obj = {};
        obj['name'] = i.name;
        obj['size'] = Math.round((i.size / 1024) * 100) / 100;
        this.filesPreview.push(obj);
      }
    } else {
      this.alert.info(this.alertContainer, `Maximum file size ${this.limit ? this.limit : 2} MB`, true, 5000);
    }
  }

  checkImage() {
    return this.accept.includes('image');
  }

  // clear all preview
  clear() {
    this.filesToUpload = [];
    this.imagePreview = [];
    this.filesPreview = [];
    this.progress = null;
  }

  // remove single image
  removeFile(i) {
    this.filesToUpload.splice(i, 1);
    this.imagePreview.splice(i, 1);
    this.filesPreview.splice(i, 1);
  }

  private getToken() {
    // const current_user = this.auth.getToken();
    return this.auth.getToken();
  }

  uploadFile() {
     console.log(this.url)
    if (this.filesToUpload && this.filesToUpload.length > 0) {
      this.fServ.upload({
        files: this.filesToUpload,
        multiple: this.multi,
        file_name: this.fileName,
        method: 'POST',
        headers: { Authorization: 'Bearer ' + this.getToken() },
        url: this.endPoint + this.url,
        data: this.data
      }).subscribe(res => {
        this.output = res;
        // console.log(res);
        if (this.output.type === 'done') {
          if (this.output.status.status === 'OK') {
            this.upload.emit(res.status);
            this.clear();
            this.output = null;
          } else {
            this.alert.error(this.alertContainer, 'Sorry!!! Failed to upload. Please try again.', true, 5000);
            this.output = null;
          }
        }
      });
    }
  }

  // button color

  uploadBtn() {
    return this.uBtn ? this.uBtn : 'btn-primary';
  }

  resetBtn() {
    return this.rBtn ? this.rBtn : 'btn-danger';
  }

}
