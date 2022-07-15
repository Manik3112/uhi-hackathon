export class Configuration {
  webhookUrl: string
  snomed: string

  constructor() {
    this.webhookUrl = process.env.WEBHOOK_URL!;
    this.snomed = process.env.SNOMED_URL!;
  }
}
