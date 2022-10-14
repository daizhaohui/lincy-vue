import {DataType, DateFormat, Model,Property} from '../../../../src/model';
import ProductInfo from './prodctInfo';

@Model()
export default class Order{

  @Property({
    dataType: DataType.Number
  })
  static productId;


  @Property()
  static productName;

  @Property({
    dataType:DataType.Object,
    objectType:ProductInfo
  })
  static firstProductInfo;

  @Property({
    dataType:DataType.Array,
    objectType:ProductInfo
  })
  static ProductInfos;
}