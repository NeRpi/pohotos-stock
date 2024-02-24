import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.js";

@Entity("photos")
export abstract class PhotoEntity extends BaseEntity {
    @Column({ type: "bytea"})
    img: Buffer

    @Column()
    name: string
}