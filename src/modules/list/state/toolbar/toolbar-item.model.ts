import { TemplateRef } from '@angular/core';

export class ListToolbarItemModel {
  public template: TemplateRef<any>;
  public location: string;
  public view: string;

  constructor(data?: any) {
    if (data) {
      this.template = data.template;
      this.location = data.location;
      this.view = data.view;
    }
  }
}
