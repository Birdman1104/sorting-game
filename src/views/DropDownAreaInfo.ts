export class DropDownAreaInfo {
  public startX: number;
  public startY: number;
  public endX: number;
  public endY: number;
  public centerX: number;
  public centerY: number;
  public isFree: boolean;
  public answer: string;
  public insertedItem: string;
  public insertedItemId: string;

  constructor(info) {
      this.startX = info.startX;
      this.startY = info.startY;
      this.endX = info.endX;
      this.endY = info.endY;
      this.centerX = info.centerX;
      this.centerY = info.centerY;
      this.isFree = info.isFree;
      this.answer = info.answer;
  }

  public setLetter(letter: string, uuid = ''): void {
      this.insertedItem = letter;
      this.insertedItemId = uuid;
      this.isFree = false;
  }

  public empty(): void {
      this.insertedItem = '';
      this.insertedItemId = '';
      this.isFree = true;
  }
}