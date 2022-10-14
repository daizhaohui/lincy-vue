import {DataType, DateFormat, Model,Property} from '../../../../src/model';

@Model()
export default class ProductInfo{

  @Property({
    dataType: DataType.Number,
    disposeName:'pId'
  })
  static id;

  @Property({
    disposeName:'ptitle'
  })
  static title;


}