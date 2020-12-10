import SearchBarComponent from 'components/SearchBar';

export default function Landing() {
  return (
    <section style={{ background: '#209cee', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ background: '#ebebeb', padding: '1.5rem' }}>
          <SearchBarComponent />
        </div>
      </div>

    </section>
  )
}
