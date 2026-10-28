import { Disclaimer } from './components/Disclaimer'
import { FeatureBar } from './components/FeatureBar'
import { Header } from './components/Header'
import { ResultCard } from './components/ResultCard'
import { RiskMeter } from './components/RiskMeter'
import { SearchForm } from './components/SearchForm'
import { useFaxCalculator } from './hooks/useFaxCalculator'

function App() {
  const fax = useFaxCalculator()
  const calculating = fax.status === 'calculating'
  const hasResult = fax.status === 'success' && fax.result !== null

  return (
    <div className="hf-app">
      <div className="hf-app__glow" aria-hidden="true" />
      <div className="hf-shell">
        <Header muted={fax.muted} onToggleMute={fax.toggleMute} />
        <Disclaimer />
        <SearchForm
          values={fax.values}
          errors={fax.errors}
          disabled={calculating}
          onChange={fax.setField}
          onSubmit={() => {
            void fax.runFax()
          }}
        />
        <RiskMeter
          score={fax.meterScore}
          zone={hasResult ? fax.result!.zone : null}
          animating={calculating}
        />
        {hasResult ? (
          <ResultCard
            name={fax.displayName}
            result={fax.result!}
            flavor={fax.flavor}
          />
        ) : (
          <ResultCard placeholder />
        )}
        <FeatureBar />
      </div>
    </div>
  )
}

export default App
