import { IconProp } from '@fortawesome/fontawesome-svg-core';

export class FilterItem {
  icon!: IconProp;
  name!: string;
  constructor(icon: IconProp, name: string) {
    this.icon = icon;
    this.name = name;
  }
}
