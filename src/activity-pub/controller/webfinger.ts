import { Controller } from '@curveball/controller';
import { Context } from '@curveball/kernel';

class WebfingerController extends Controller {

  get(ctx: Context) {

    const account = 'acct:' + process.env.USERNAME + '@' + ctx.request.origin.split('://')[1];
    ctx.response.type = 'application/jrd+json';
    ctx.response.body = {
      'subject': account,
      'links': [
        {
          'rel': 'self',
          'type': 'application/activity+json',
          'href': ctx.request.origin + '/actor',
        }
      ]
    };

  }

}


export default new WebfingerController();
