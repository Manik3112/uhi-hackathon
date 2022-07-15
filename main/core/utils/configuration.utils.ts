export class Configuration {
  webhookUrl: string
  constructor() {
    this.webhookUrl = process.env.WEBHOOK_URL!;
  }
}
