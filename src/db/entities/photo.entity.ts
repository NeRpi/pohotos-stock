import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.ts";

@Entity("photos")
export abstract class PhotoEntity extends BaseEntity {
    @Column({ type: "bytea"})
    img: Buffer

    @Column()
    name: string
}