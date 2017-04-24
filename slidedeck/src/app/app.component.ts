import { Component } from '@angular/core';

const context = require.context('../slides', true, /\.md|markdown$/);

const slides: any[][] = context.keys()
  .sort((a: string, b: string) => {
    const getSortObject = (name: string) => {
      const [ , folderName, fileName ] = name.split('/');
      return {
        folder: parseInt(folderName.split('-').shift(), 10),
        file: parseInt(fileName.split('.').shift(), 10),
        fileName
      };
    };

    const aSort = getSortObject(a);
    const bSort = getSortObject(b);

    const folderDiff = aSort.folder - bSort.folder;

    if ( folderDiff === 0 ) {
      const fileDiff = aSort.file - bSort.file;
      if ( fileDiff === 0 ) {
        const aSplit = aSort.fileName.split('-');
        const bSplit = bSort.fileName.split('-');
        if ( aSplit.length === 1 || bSplit.length === 1 ) {
          return aSplit.length === 1 && bSplit.length === 1 ? 0 : aSplit.length - bSplit.length;
        }
        return aSort.fileName.localeCompare(bSort.fileName);
      }
      return fileDiff;
    }
    return folderDiff;
  })
  .reduce((newSlides: any[][], key: string) => {
    const [ , folderName ] = key.split('/');
    const index = parseInt(folderName.split('-').shift(), 10);
    if ( !newSlides[index] ) {
      newSlides[index] = [];
    }
    newSlides[index].push(context(key));
    return newSlides;
  }, []);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  slides: any[][] = slides;
}
