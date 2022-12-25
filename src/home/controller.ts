import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

class HomeController extends Controller {

  get(ctx: Context) {

    const userName = process.env.USERNAME + '@' + ctx.request.origin.split('://')[1];
    const account = 'acct:' + userName;

    ctx.response.type = 'application/json';
    ctx.response.body = {
      title: 'Welcome to the ActivityPub test server.',
      _links: {
        'webfinger-endpoint': {
          href: '/.well-known/webfinger?resource=' + account,
          title: 'Webfinger endpoint',
        },
        'actor': {
          href: '/actor',
          title: 'ActivityPub Actor endpoint',
        },
        'outbox': {
          href: '/outbox',
          title: 'ActivityPub Outbox',
        },
        'account': {
          href: account,
          title: 'ActivityPub main account',
        }
      },
      'fediverse-username': '@' + userName,
    };

  }

}

export default new HomeController();
