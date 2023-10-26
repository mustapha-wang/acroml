class Com_Left extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {};
    this.menu_click = this.menu_click.bind(this);
    console.log('left constructor');
  }
  menu_click(e){
    //console.log(e);
    e.preventDefault();
    //root_right.render();
    let name=e.target.innerHTML;
    let file=e.target.getAttribute('file');
    this.props.switchTab(name,file);
  }
  render() {
    console.log('left render');
    return (
      <div>
        <a href='/'>{t('Home')}</a><br/>
        <a href='/likeButton' onClick={this.menu_click} file='/react/app/likeButton/page.likeButton.jsx'>{t('demo:likeButton')}</a><br/>
        <a href='/timer' onClick={this.menu_click} file='/react/app/timer/page.timer.jsx'>{t('demo:timer')}</a><br/>
        <a href='/ref' onClick={this.menu_click} file='/react/app/ref/page.ref.jsx'>{t('demo:ref')}</a><br/>
        <a href='/datagrid' onClick={this.menu_click} file='/react/app/datagrid/page.datagrid.jsx'>{t('demo:datagrid')}</a><br/>
      </div>
    );
  }
}
export default Com_Left;