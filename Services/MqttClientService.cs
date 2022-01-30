using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Connecting;
using MQTTnet.Client.Disconnecting;
using MQTTnet.Client.Options;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Services;

namespace Mqtt.Client.AspNetCore.Services
{
    public class MqttClientService : IMqttClientService
    {
        private IMqttClient mqttClient;
        private IMachineService _machineService;
        private IMqttClientOptions options;

        public MqttClientService(IMqttClientOptions options, IMachineService machineService)
        {
            this.options = options;
            mqttClient = new MqttFactory().CreateMqttClient();
            ConfigureMqttClient();
            _machineService = machineService;
        }

        private void ConfigureMqttClient()
        {
            mqttClient.ConnectedHandler = this;
            mqttClient.DisconnectedHandler = this;
            mqttClient.ApplicationMessageReceivedHandler = this;
        }

        public async Task HandleApplicationMessageReceivedAsync(MqttApplicationMessageReceivedEventArgs eventArgs)
        {
            Console.WriteLine(Encoding.UTF8.GetString(eventArgs.ApplicationMessage.Payload));
            await _machineService.MachineReceiveData(Encoding.UTF8.GetString(eventArgs.ApplicationMessage.Payload));
        }

        public async Task HandleConnectedAsync(MqttClientConnectedEventArgs eventArgs)
        {
            System.Console.WriteLine("connected");
            await mqttClient.SubscribeAsync("test/test1");
            await mqttClient.SubscribeAsync("test/test2");
            await mqttClient.SubscribeAsync("test/test3");
        }

        public async Task HandleDisconnectedAsync(MqttClientDisconnectedEventArgs eventArgs)
        {
            await mqttClient.ReconnectAsync();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                await mqttClient.ConnectAsync(options);
                if (!mqttClient.IsConnected)
                {
                    await mqttClient.ReconnectAsync();
                }
            }
            catch (Exception ex)
            {
                await mqttClient.ReconnectAsync();
            }


        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                var disconnectOption = new MqttClientDisconnectOptions
                {
                    ReasonCode = MqttClientDisconnectReason.NormalDisconnection,
                    ReasonString = "NormalDiconnection"
                };
                await mqttClient.DisconnectAsync(disconnectOption, cancellationToken);
            }
            await mqttClient.DisconnectAsync();
        }
    }
}
