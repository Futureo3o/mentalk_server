const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI 3.0 버전 사용
    info: {
      title: "MENTALK API",
      version: "1.0.0",
      description: "MENTALK API documentation",
      contact: {
        name: "MENTALK Team",
        email: "support@mentalk.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080", // 서버 URL (로컬 또는 배포된 서버)
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // API 문서를 생성할 파일들
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;
