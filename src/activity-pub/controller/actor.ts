import { Controller } from '@curveball/controller';
import { Context } from '@curveball/kernel';
import { getActor } from '../service';

class ActorController extends Controller {

  get(ctx: Context) {

    ctx.response.type = 'application/ld+json; profile="https://www.w3.org/ns/activitystreams';
    ctx.response.body = getActor();

  }

}

export default new ActorController();
