
var Nat5 = React.createClass({
  render: function() {
    return (
      <div className="Nat5">
        <div className="Nat5Header">
          <img src={this.props.json.url} />
        </div>
        <div className="Nat5Reqs">
          {this.props.json.requirements.map(function(r,i) {
            return <Nat4 key={i} name={r.name} requirements={r.requirements} url={r.url} />;
          })}
          </div>
      </div>
    );
  }
});

var up = "glyphicons/glyphicons/png/glyphicons-601-chevron-up.png";
var down = "glyphicons/glyphicons/png/glyphicons-602-chevron-down.png";

var Nat4 = React.createClass({
  getInitialState: function() {
      return {showRequirements: true, arrow: up, selectedNat3s: 0};
  },
  updateSelectedNat3s : function(selected) {
    this.setState({selectedNat3s: selected ? this.state.selectedNat3s+1 : this.state.selectedNat3s-1}, function () {
      if (this.state.selectedNat3s == 4) this.setState({showRequirements: false, arrow: down, selectedNat3s: 0});
    });
  },
  onClick: function() {
      this.setState({ showRequirements: !this.state.showRequirements, arrow: this.state.arrow == up ? down : up });
  },
  render: function() {
    var _this = this;
    return (
      <div className="Nat4">
          <img onClick={this.onClick} src={this.props.url} className={this.state.showRequirements ? "grayed" : null} />
          {this.props.requirements.length != 0 ?
            <input onClick={this.onClick} type="image" src={this.state.arrow}/>
            : null
          }
          {this.state.showRequirements ?
            this.props.requirements.map(function(r,i){return <Nat3 updateSelectedNat3s={_this.updateSelectedNat3s} key={i} name={r.name} url={r.url} />;})
            : null
          }
      </div>
    );
  }
});

var Nat3 = React.createClass({
  propTypes : {
    updateSelectedNat3s: React.PropTypes.func,
  },
  getInitialState: function() {
      return {grayed : true};
  },
  onClick: function() {
      this.setState({grayed: !this.state.grayed});
      this.props.updateSelectedNat3s(this.state.grayed);
  },
  render: function() {
    return (
      <img onClick={this.onClick} src={this.props.url} className={this.state.grayed ? "Nat3 grayed" : "Nat3"}  />
    );
  }
});

ReactDOM.render(<Nat5 json={veromosJSON}/>, document.getElementById('veromos'));
