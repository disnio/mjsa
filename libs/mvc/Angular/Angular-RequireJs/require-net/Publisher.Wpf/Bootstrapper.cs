using System.Windows;
using Microsoft.Practices.Prism.Modularity;
using Microsoft.Practices.Prism.UnityExtensions;
using Microsoft.Practices.Unity;
using Publisher.Wpf.Services;


namespace Publisher.Wpf
{
    public class Bootstrapper : UnityBootstrapper
    {
        


        protected override void ConfigureContainer()
        {
            base.ConfigureContainer();
            this.Container.RegisterType<IWebSocketInvoker, WebSocketInvoker>(new ContainerControlledLifetimeManager());
            this.Container.RegisterType<IMessageBoxService, MessageBoxService>(new ContainerControlledLifetimeManager());
        }

        protected override DependencyObject CreateShell()
        {
            return this.Container.Resolve<MainWindow>();
        }




        protected override void InitializeShell()
        {
            base.InitializeShell();

            App.Current.MainWindow = (Window)this.Shell;
            App.Current.MainWindow.Show();
        }
    }
}
