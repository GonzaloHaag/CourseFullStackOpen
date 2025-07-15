import { useEffect, useState, type SyntheticEvent } from "react"
import { type ValidationError, type DiaryData, type NewDiary } from "./types";
import diaryService from "./services/diaryService";
import axios from "axios";


function App() {

  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [contentDiary, setContentDiary] = useState<NewDiary>({
    date: '',
    visibility: 'great',
    weather: 'sunny',
    comment: ''
  });

  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await diaryService.getAllDiaries();
      setDiaries(response)
    }
    fetchDiaries()
  }, []);

  const diaryCreation = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('ENVIO')
    try {
      const response = await diaryService.createDiary(contentDiary);
      setDiaries(diaries.concat(response))
      setContentDiary({
        date: '',
        visibility: 'great', // reset to first radio
        weather: 'sunny',    // reset to first radio
        comment: ''
      })
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log('---- ERROR ------')
        console.log(error.status);
        console.log(error.response);
        setError(typeof error.response?.data === "string" ? error.response.data : "Uknown error")
      } else {
        setError("uknown error")
      }
    }
  }
  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        {
          error && (
            <span style={{ color: 'red' }}>{error}</span>
          )
        }
        <form onSubmit={diaryCreation} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex' }}>
            <label htmlFor="date">date</label>
            <input value={contentDiary.date}
              onChange={(e) => setContentDiary({ ...contentDiary, date: e.target.value })}
              name="date"
              type="date" />
          </div>
          <div style={{ display: 'flex' }}>
            <label htmlFor="visibility" style={{marginRight:'0.2rem'}}>visibility</label>
            <input
              value="great"
              checked={contentDiary.visibility === 'great'}
              onChange={() => setContentDiary({ ...contentDiary, visibility: 'great' })}
              name="visibility"
              type="radio"
            />
            great
            <input
              value="good"
              checked={contentDiary.visibility === 'good'}
              onChange={() => setContentDiary({ ...contentDiary, visibility: 'good' })}
              name="visibility"
              type="radio"
            />
            good
            <input
              value="ok"
              checked={contentDiary.visibility === 'ok'}
              onChange={() => setContentDiary({ ...contentDiary, visibility: 'ok' })}
              name="visibility"
              type="radio"
            />
            ok
            <input
              value="poor"
              checked={contentDiary.visibility === 'poor'}
              onChange={() => setContentDiary({ ...contentDiary, visibility: 'poor' })}
              name="visibility"
              type="radio"
            />
            poor
          </div>
          <div style={{ display: 'flex' }}>
            <label htmlFor="wather" style={{marginRight:'0.2rem'}}>weather</label>
            <input
              value="sunny"
              checked={contentDiary.weather === 'sunny'}
              onChange={() => setContentDiary({ ...contentDiary, weather: 'sunny' })}
              name="weather"
              type="radio"
            />
            sunny
            <input
              value="rainy"
              checked={contentDiary.weather === 'rainy'}
              onChange={() => setContentDiary({ ...contentDiary, weather: 'rainy' })}
              name="weather"
              type="radio"
            />
            rainy
            <input
              value="cloudy"
              checked={contentDiary.weather === 'cloudy'}
              onChange={() => setContentDiary({ ...contentDiary, weather: 'cloudy' })}
              name="weather"
              type="radio"
            />
            cloudy
            <input
              value="stormy"
              checked={contentDiary.weather === 'stormy'}
              onChange={() => setContentDiary({ ...contentDiary, weather: 'stormy' })}
              name="weather"
              type="radio"
            />
            stormy
            <input
              value="windy"
              checked={contentDiary.weather === 'windy'}
              onChange={() => setContentDiary({ ...contentDiary, weather: 'windy' })}
              name="weather"
              type="radio"
            />
            windy
          </div>
          <div style={{ display: 'flex' }}>
            <label htmlFor="comment">comment</label>
            <input value={contentDiary.comment}
              onChange={(e) => setContentDiary({ ...contentDiary, comment: e.target.value })}
              name="comment"
              type="text" />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
      <h2>Diary entries</h2>
      {
        diaries.map((diary) => (
          <div key={diary.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <h4>{diary.date.toString()}</h4>
            <span>visibility: {diary.visibility}</span>
            <span>weather: {diary.weather}</span>
          </div>
        ))
      }
    </div>
  )
}

export default App
