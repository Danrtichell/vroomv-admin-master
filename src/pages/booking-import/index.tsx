import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import importApi from 'api/import'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper, PrimaryButton } from 'components/shared/style'
import { FormWrapper, IndefiniteProgress, SampleContainer } from './style'

const Page = () => {
  const history = useHistory()
  const [file, setFile] = useState('')
  const [isSaving, toggleSaving] = useState(false)

  const handleFileChanged = (evt: any) => {
    setFile(evt.target.files[0])
  }

  const handleUpload = async () => {
    const form = new FormData()

    form.append('csv', file)

    toggleSaving(true)

    const batch = await importApi.upload(form)

    setTimeout(() => {
      toggleSaving(false)
      history.push(`/bookings-import/${batch.id}`)
    }, 3000)
  }

  return (
    <div>
      <NavigationInfo backLink="/" current="Bookings Import" primary="Home" />
      <AppContentWrapper>
        <FormWrapper>
          {isSaving ? <IndefiniteProgress /> : null}
          <input type="file" onChange={handleFileChanged} />
          <PrimaryButton
            onClick={handleUpload}
            disabled={isSaving}
            color="primary"
            variant="contained"
          >
            Upload
          </PrimaryButton>
        </FormWrapper>
        <SampleContainer>
          Sample csv <a href="sample.csv">here</a>
        </SampleContainer>
      </AppContentWrapper>
    </div>
  )
}

export default Page
