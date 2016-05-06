namespace Publisher.Wpf.Services
{
    public interface IWebSocketInvoker
    {
        void SendNewMessage(string jsonMessage);
    }
}
