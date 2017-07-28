var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props) {
  var languages = ['All', 'Java', 'Javascript', 'Python', 'CSS'];

  return (
    <ul className='languages'>
      {languages.map(language => {
        return (
          <li
            style=
            { language === props.selectedLanguage ? { color: 'red' }: null }
            key={language}
            onClick={props
            .updateLanguage
            .bind(null, language)}>
            {language}
          </li>
        );
      })
}
    </ul>
  )
}

SelectLanguage.propTypes = {
  updateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this
      .updateLanguage
      .bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(language) {
    this
      .setState(function () {
        console.log(language)
        return {selectedLanguage: language, repos: null}
      });

    api
      .fetchPopularRepos(language)
      .then(repos => {
        console.log(repos);
        this.setState(function () {
          return {
            // selectedLanguage: language,
            repos: repos
          }
        })
      })
  }

  render() {
    return (
      <div>
        <Loading text= 'downloading' speed={10}/>
        <SelectLanguage
          updateLanguage={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}/>
        {!this.state.repos? <Loading/> :<RepoGrid repos={this.state.repos}/> }
      </div>
    );
  }
}

module.exports = Popular;