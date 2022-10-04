import { iam, lambda } from "@pulumi/aws";

const { Role, getPolicyDocument }: typeof iam = iam;
const { Function }: typeof lambda = lambda;

const { arn }: iam.Role = new Role("iamForLambda", {
  assumeRolePolicy: (
    await getPolicyDocument({
      statements: [
        {
          actions: ["sts:AssumeRole"],
          principals: [
            {
              type: "Service",
              identifiers: ["ec2.amazonaws.com"],
            },
          ],
        },
      ],
    })
  ).json,
});

new Function("zsb_lambda", {
  imageUri: "",
  role: arn,
  handler: "index.default",
  runtime: "nodejs",
});
