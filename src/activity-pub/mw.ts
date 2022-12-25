import { Middleware, invokeMiddlewares } from '@curveball/kernel';
import router from '@curveball/router';
import webfingerController from './controller/webfinger';
import actorController from './controller/actor';
import outboxController from './controller/outbox';

const routes = [
  router('/.well-known/webfinger', webfingerController),
  router('/actor', actorController),
  router('/outbox', outboxController),
];

export default function activityPub(): Middleware {

  return async function activityPub(ctx, next) {

    await invokeMiddlewares(ctx, [
      ...routes,
      next
    ]);

  };

}
