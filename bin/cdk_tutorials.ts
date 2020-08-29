#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { CdkTutorialsStack, CdkFollowSQSStack, CdkFollowLambdaStack } from '../lib/cdk_tutorials-stack';

const app = new cdk.App();
new CdkTutorialsStack(app, 'KSWStack');
new CdkFollowSQSStack(app, 'KSWStackSQS');
new CdkFollowLambdaStack(app, 'KSWStackLambda')

