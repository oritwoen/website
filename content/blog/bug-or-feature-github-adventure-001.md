---
title: "Bug or Feature? GitHub Adventure #001"
description: "Is GitHub OAuth really safe?"
date: 2019-09-21
image:
  src: /images/blog/github-oauth-adventure/oauth-app-setup.png
badge:
  label: security
authors:
  - name: oritwoen
    to: https://github.com/oritwoen
    avatar:
      src: https://github.com/oritwoen.png
---

> Originally published on [medium.com/oad-earth](https://medium.com/oad-earth/bug-or-feature-github-adventure-001-eae9bea48ae8).

## Start

In this post, we'll focus on OAuth in GitHub. The information that will be presented here is not very popular and detailed mentions of it are quite difficult to find on the Internet.

_What is presented here is for informational purposes and to present the problem. The author of this entry is not responsible for how this information will be used._

Let's start with the GitHub documentation and specifically the detailed point located at the url: [https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls) and it reads as follows:

_The `redirect_uri` parameter is optional. If left out, GitHub will redirect users to the callback URL configured in the OAuth Application settings. If provided, the redirect URL's host and port must exactly match the callback URL. The redirect URL's path must reference a subdirectory of the callback URL._

> CALLBACK: [http://example.com/path](http://example.com/path)
>
> GOOD: [http://example.com/path](http://example.com/path)
> GOOD: [http://example.com/path/subdir/other](http://example.com/path/subdir/other)
> BAD: [http://example.com/bar](http://example.com/bar)
> BAD: [http://example.com/](http://example.com/)
> BAD: [http://example.com:8080/path](http://example.com:8080/path)
> BAD: [http://oauth.example.com:8080/path](http://oauth.example.com:8080/path)
> BAD: [http://example.org](http://example.org)

It is worth paying special attention to the fragment: **If provided, the redirect URL's host and port must exactly match the callback URL.**

This documentation is misleading and in reality is slightly different. The real operation of the application is not limited only to the domain set in the settings, but to any subdomain, which in practice means the following situation:

> CALLBACK: [http://example.com](http://example.com)
>
> GOOD: [http://example.com/path](http://example.com/path)
> GOOD: [http://example.com/path/subdir/other](http://example.com/path/subdir/other)
> GOOD: [http://hack.example.com](http://hack.example.com)
> GOOD: [http://admin.example.com](http://admin.example.com)
> GOOD: [http://user.example.com](http://user.example.com)
> GOOD: [http://domain.taken.over.example.com](http://domain.taken.over.example.com)
> GOOD: [http://custom.subdomain.registered.by.user.example.com](http://custom.subdomain.registered.by.user.example.com)

You can easily check this by creating your own OAuth application, such as the test in the screenshot below.

![OAuth application setup](/images/blog/github-oauth-adventure/oauth-app-setup.png)

And then go to the following address: [https://github.com/login/oauth/authorize?client_id=c8aa24b96126066e58ce&redirect_uri=http://domain.taken.over.oad.earth/path](https://github.com/login/oauth/authorize?client_id=c8aa24b96126066e58ce&redirect_uri=http://domain.taken.over.oad.earth/path)

![Authorize page with subdomain redirect](/images/blog/github-oauth-adventure/authorize-page.png)

## Why is there a problem here?

– The first thing is that developers set a specific "callback" path when creating an OAuth application because of specific reasons. So they expect that according to their own settings everything will take place as they agreed and other paths will not be allowed. Problem 1 is the threat to the developer application working through a non-specific OAuth system.

– The second issue is the threat in subdomains. It is not uncommon for hackers to take over subdomains. If the website has a subdomain that is publicly registerable by another user or prone to takeover, a dangerous situation is created. There is a threat to the entire infrastructure and all users because the traffic of the OAuth application can be redirected to a place controlled by an unauthorized person. In this way, the attacker can gain access to authorization tokens through simple manipulations and the user will not suspect anything because the main domain agrees.

## How did GitHub react to such a report?

Actually, it's nothing. I received the following response:

> Hi,
>
> Thanks for the submission! We have reviewed your report and validated your findings. After internally assessing the finding we have determined it is a known low risk issue. We may make this functionality more strict in the future, but don't have anything to announce right now. As a result, this is not eligible for reward under the Bug Bounty program.
>
> Best regards and happy hacking!

**I still tried to talk to them about this topic, however, the next answers are:**

> The ability to reference a subdomain of the callback URL in the oauth `redirect_uri` and the related risks is a known issue for GitHub. It is currently being tracked and prioritized. While we are unable to reward the bounty due to the known-issue status, we do sincerely appreciate your submission.

**AND**

> We definitely appreciate this feedback you have provided us with and will add your comments to the existing issue we have open for this bug. Again, thank you for participating in our bug bounty program!

## Finish

After receiving that answer, I searched the Internet for any information on this subject. It turned out that this bug in the application logic has been around for at least **3 years** and nothing has been done about it.

I found this mentioned here: [https://hackerone.com/reports/292825](https://hackerone.com/reports/292825)

The user who reported it received the same answer, i.e. automatic classification and ignoring the problem.

_This is the end of this entry. The next "adventure" will start soon. If you liked it, I encourage you to a joint discussion :D_
