import {BooleanFormat, DataType, DateFormat, Model,NumberFormat,Property} from '../../../../src/model';
import ProductType from './product';

@Model()
export default class Order{

  @Property({
    dataType: DataType.Array,
    parseName:'a.b.c',
    disposeName:'d'
  })
  static a;

  @Property({
    dataType:DataType.Number,
    format:NumberFormat.S3
  })
  static price;

  @Property({
    dataType: DataType.Number,
    parseName:'id',
    disposeName:'id'
  })
  static orderID;

  @Property({
    dataType: DataType.String
  })
  static orderName;

  @Property()
  static name1;

  @Property({
    dataType:DataType.Boolean,
    default:false,
    format:BooleanFormat.IntStr
  })
  static test_bool;

  @Property({
    dataType:DataType.Array,
    disposeName:'arr'
  })
  static testArr;

  @Property({
    dataType:DataType.Date,
    format:DateFormat.YMDHMS
  })
  static testDate;

  @Property({
    dataType:DataType.Object,
    objectType:ProductType
  })
  static firstProduct;

  @Property({
    dataType:DataType.Array,
    objectType:ProductType
  })
  static products;

}