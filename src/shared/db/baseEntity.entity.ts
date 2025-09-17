import { PrimaryKey, DateTimeType, Property} from "@mikro-orm/core";

<<<<<<< HEAD
export abstract class BaseEntity{
=======
export abstract class BaseEntity {
>>>>>>> origin/main
    @PrimaryKey()
    id?: number

    /*
<<<<<<< HEAD
    @Property({type:DateTimeType})
    createdAt? = new Date()

    @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
    })
    updateAt? = new Date()
=======
    @Property({type: DateTimeType})
    createdAt?: new Date()

    @Property({
        type: DateTimeType,
        onUpdate: () => new Date(),
        })
    updateAt? = new Date(),
>>>>>>> origin/main
    */
}