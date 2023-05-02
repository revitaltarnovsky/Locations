import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: any) {
    let filteredList: any = [];

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return (item["fullName"].toLocaleLowerCase().match(searchText) || item["phoneNumber"].toLocaleLowerCase().match(searchText) || item["birthday"].toLocaleLowerCase().match(searchText))
    });
  }

}
