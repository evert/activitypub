import { Controller } from '@curveball/controller';
import { Context } from '@curveball/kernel';
import { getOutbox } from '../service';

class OutboxController extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/ld+json; profile="https://www.w3.org/ns/activitystreams';
    ctx.response.body = await getOutbox();

  }

}

export default new OutboxController();

