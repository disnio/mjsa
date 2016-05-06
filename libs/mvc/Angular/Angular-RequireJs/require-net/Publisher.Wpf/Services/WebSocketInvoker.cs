
using System;
using System.Collections.Generic;
using Fleck;

namespace Publisher.Wpf.Services
{
    public class WebSocketInvoker : IWebSocketInvoker
    {
        List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();
        WebSocketServer server = new WebSocketServer("ws://localhost:8181");

        public WebSocketInvoker()
        {
            FleckLog.Level = LogLevel.Debug;
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Open!");
                    allSockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSockets.Remove(socket);
                };
                socket.OnMessage = Console.WriteLine;
            });
        }

        public void SendNewMessage(string jsonMessage)
        {
            foreach (var socket in allSockets)
            {
                socket.Send(jsonMessage);
            }
        }
    }
}
