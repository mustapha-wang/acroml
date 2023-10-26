class Com_LikeButton extends React.Component {
  constructor(props) {
    console.log('likebutton constructor');
    super(props);
    this.state = { liked: false };
  }
  foil_onStateChanged(state){
    console.log('likebutton foil_onStateChanged',state);
  }
  
  render() {
    console.log('likeButton render',this.props);
    if (this.state.liked) {
      console.log(AcroML.Engine.instance.LCID);
      return t('&File');
    }
    return (
      <button onClick={() => this.setState({ liked: true })}>
        {t('&Edit')}
      </button>
    );
  }
}
export default Com_LikeButton;