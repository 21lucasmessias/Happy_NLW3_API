import Orphanage from '../models/Oprhanage';
import ViewImages from './viewImages'

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      number: orphanage.number,
      about: orphanage.about,
      instructions: orphanage.instructions,
      schedule: orphanage.schedule,
      weekend: orphanage.weekend,
      images: ViewImages.renderMany(orphanage.images)
    }
  },

  renderMany(orphanages: Array<Orphanage>) {
    return orphanages.map(orphanage => {
      return {
        id: orphanage.id,
        name: orphanage.name,
        latitude: orphanage.latitude,
        longitude: orphanage.longitude
      }
    })
  }
}