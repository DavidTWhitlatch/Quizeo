import SearchBar from 'material-ui-search-bar';

export default function SearchBarComponent() {
  return (
    <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
      searchIcon={<SearchIcon style={{ color: 'gray' }} />}
    />
  )
}
