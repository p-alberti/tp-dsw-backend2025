import { PrimaryKey, DateTimeType, Property} from "@mikro-orm/core";

export abstract class BaseEntity{
    @PrimaryKey()
    id?: number

    /*
    @Property({type:DateTimeType})
    createdAt? = new Date()

    @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
    })
    updateAt? = new Date()
    */
}