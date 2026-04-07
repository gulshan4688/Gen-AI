import React from 'react'
import '../style/home.scss'

const Home = () => {
    return (
        <main className='home'>
            <div className="container">
                <h1 className="title">Interview Report Generator</h1>

                <div className="interview-input-group">
                    
                    <div className="card left">
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea 
                            name="jobDescription" 
                            id="jobDescription" 
                            placeholder='Paste the job description here...'
                        ></textarea>
                    </div>

                    <div className="card right">

                        <div className="input-group">
                            <p className="section-title">
                                Resume 
                                <small className='highlight'>
                                    (Use resume + self description for best results)
                                </small>
                            </p>

                            <label className='file-label' htmlFor="resume">
                                📄 Upload Resume
                            </label>
                            <input hidden type="file" name='resume' id='resume' accept='.pdf' />
                        </div>

                        <div className="input-group">
                            <label htmlFor="selfDescription">Self Description</label>
                            <textarea 
                                name='selfDescription' 
                                placeholder='Describe yourself, skills, experience...'
                            ></textarea>
                        </div>

                        <button className='primary-button button'>
                            Generate Interview Report
                        </button>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Home