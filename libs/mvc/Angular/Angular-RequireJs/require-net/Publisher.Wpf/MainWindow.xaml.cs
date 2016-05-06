using System.Windows;
using System.Windows.Input;
using Microsoft.Practices.Unity;
using Publisher.Wpf.ViewModels;


namespace Publisher.Wpf
{
    public partial class MainWindow : Window
    {
        public MainWindow([Dependency]MainWindowViewModel viewModel)
        {
            InitializeComponent();
            this.DataContext = viewModel;
            this.Loaded += (s, e) => { (viewModel as IViewLoadedAware).CreateItems(); };
        }


        private void Grid_MouseDown(object sender, MouseEventArgs e)
        {
            this.DragMove();
        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }


    }
}
