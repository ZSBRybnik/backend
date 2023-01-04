import swaggerJsdoc from "swagger-jsdoc";
import { setup } from "swagger-ui-express";

const getSwaggerMiddleware = () => {
  const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "ZSB backend",
        version: "2.1.37",
      },
      tags: [{ name: "Page endpoints" }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["source/server/rest/routes/**/*.{ts,tsx}"],
  };
  const openapiSpecification = swaggerJsdoc(options);
  return setup(openapiSpecification, {
    swaggerOptions: {
      url: "https://localhost:8080/",
    },
  });
};

export default getSwaggerMiddleware;
