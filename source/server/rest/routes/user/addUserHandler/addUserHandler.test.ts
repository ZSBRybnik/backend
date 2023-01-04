import { faker } from "@faker-js/faker";
import superTest from "supertest";
import createServer from "../../../utils/createServer/createServer";

describe("addUserHandler", () => {
  it("passed", (done) => {
    const server = createServer({ port: 3000 });
    superTest(server)
      .post("/user")
      .send({
        login: faker.internet.userName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        enabledTwoFactorAuthentication: "application",
        role: "administrator",
      })
      .expect(201, done);
  });
});
