# CDK 튜토리얼 ( AWS WorkShop )
cdk로 하면 cloud formation으로 자동으로 구성된다
배포의 최소 단위는 stack -> app
asset(별도 첨부 파일)이 있으면 bootstrap을 해줘야 한다 
~~~
cdk bootstrap aws://{ID}/{REGION} --profile ap-rs # 부트스트랩
~~~
~~~ 
cdk init app --language typescript # typescript로 해도 결국에는 javascript converting하고 된다
~~~
> bin/cdk_tutorials.ts를 봐야함
app -> stack 
~~~
cdk list # stack이 생성된다. 컴파일을 하는 거임.
~~~

필요한 것들 aws docs에 들어가서 라이브러리를 설치하고 예시를 보면서 만든다.

~~~
npm install @aws-cdk/aws-s3
cdk list
cdk deploy CdkTutorialsStack1 --profile ap-rs # 배포의 최소 단위는 Stack이고 구성되면 app이 된다.
~~~
cdk 구성을 변경하고 싶다면
~~~
cdk diff CdkTutorialsStack1 --profile ap-rs
~~~
cdk 구성을 제거하고 싶다면
~~~
cdk destroy CdkTutorialsStack1 --profile ap-rs
~~~
cdk synth - 클라우드 포메이션 파일을 생성한다.
~~~
cdk synth KSWStack --profile ap-rs
~~~
~~~
npx npm-check-update -u # npm package 버전을 맞춰준다
~~~

### Lambda
Trigger 는 여러개가 있지만 본 과정에서는 API Gateway를 Add Trigger로 사용한다.

# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


export class CdkFollowSQSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'CdkWorkshopTopic');

    topic.addSubscription(new subscriptions.SqsSubscription(queue));
  }
}

export class CdkFollowLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloLambdaHandler-KSW', {
      functionName: 'KSW-first-lambda',
      runtime: lambda.Runtime.NODEJS_10_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory 루트 디렉토리 기준이다
      handler: 'hello.handler'                // file is "hello", function is "handler" 
    });
  }
}
