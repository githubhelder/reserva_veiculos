import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);
    
        await connection.query(`
            INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
            VALUES (
                '${id}',
                'admin',
                'contato@heldermorais.com.br',
                '${password}',
                true,
                '0123456789',
                'now()'
            )
        `);
    });

    afterAll(async() => {
        await connection.dropDatabase();
        await connection.close;
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "contato@heldermorais.com.br",
            password: "admin"
        });        

        const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
             name: "Category supertest",
             description: "Description Category supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        })

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "contato@heldermorais.com.br",
            password: "admin"
        });        

        const {refresh_token} = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
             name: "Category supertest",
             description: "Description Category supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        })

        expect(response.status).toBe(400);
    });


});