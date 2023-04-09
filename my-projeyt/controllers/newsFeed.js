import googleIt from "google-it"
import metaData from "../models/metaData.js"
import searchQuery from "../models/searchQueries.js"
import student from "../models/student.js"

export default function NewsFeedController() {
    return {
        searchNews: async function ({ roll, query, limit, save }) {
            try {
                if (save) {
                    const new_query = new searchQuery({
                        query: query
                    })
                    await new_query.save()
                    await student.updateOne({ roll: roll }, {
                        $inc: {
                            "queries.total": 1,
                            "queries.monthly": 1
                        }
                    })
                    await metaData.updateOne({ key: 'total_queries_count' }, { $inc: { value: 1 } })
                }
                const result = await googleIt({ query: query, limit: limit || 10 })
                return result
            }
            catch (e) {
                return { ...e, errno: 404 }
            }
        }
    }
}
