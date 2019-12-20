import GitHub from 'github-api';

export async function listPrs(bot, message) {
  const gh = new GitHub(
    { token: process.env.GITHUB_ACCESS_TOKEN },
    process.env.GITHUB_API_BASE_URL
  );

  const repoName = message.text.split(' ')[2];
  const repo = gh.getRepo(process.env.GITHUB_ORG_NAME, repoName);

  await repo.listPullRequests().then(({ data }) => {
    let openPrs = data;
    let reply : String;
    if (openPrs.length === 0) {
      reply = `There are no open PRs for ${repoName}.`
    } else {
      reply = `Here's all the open PRs for ${repoName}:\n`
      openPrs.forEach(pr => {
        reply += `- ${pr.title}\n`;
        reply += `\t- ${pr.user.login}\n`;
        reply += `\t- ${pr.html_url}\n`;
      });
    }
    bot.say({ markdown: reply });
  }).catch((error) => {
    console.log(error.response.status);
    if (error.response.status === 404) {
      bot.say(`I can't find any repository named ${repoName}.`);
    } else {
      console.error(error);
    }
  });
}
