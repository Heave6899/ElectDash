namespace Mqtt.Client.AspNetCore.Services
{
    public class ExternalService
    {
        private readonly IMqttClientService mqttClientService;
        public ExternalService(MqttClientServiceProvider provider)
        {
            mqttClientService = provider.MqttClientService;
        }
    }
}
