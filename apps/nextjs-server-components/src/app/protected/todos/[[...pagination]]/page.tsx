import { gql } from '@apollo/client'
import TodoItem, { type Todo } from '@components/todo-item'
import withAuthAsync from '@utils/auth-guard'
import { getNhost } from '@utils/nhost'

import Head from 'next/head'
import Link from 'next/link'

const Todos = async ({ params }: { params: { [key: string]: string | string[] | undefined } }) => {
  const page = parseInt(params.pagination?.at(0) || '0')

  const nhost = await getNhost()

  console.log("httpUrl", nhost.graphql.httpUrl)
  console.log("wsUrl", nhost.graphql.wsUrl)
  console.log("authUrl", nhost.auth.url)
  console.log("storageUrl", nhost.storage.url)

  const res = await nhost.graphql.request(
    gql`
      query getTodos($limit: Int, $offset: Int) {
        todos(limit: $limit, offset: $offset, order_by: { createdAt: desc }) {
          id
          title
          done
          attachment {
            id
          }
        }

        todos_aggregate {
          aggregate {
            count
          }
        }
      }
    `,
    {
      offset: page * 10,
      limit: 10
    }
  )
  console.log(res)
  const {
    data: {
      todos,
      todos_aggregate: {
        aggregate: { count }
      }
    }
  } = res

  return (
    <div className="space-y-4">
      <Head>
        <title>Protected Page</title>
      </Head>

      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">Todos ({count})</h2>

        <Link
          href={`/protected/todos/new`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo
        </Link>
      </div>

      <ul className="space-y-1">
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>

      {count > 10 && (
        <div className="flex justify-center space-x-2">
          {page > 0 && (
            <Link
              href={`/protected/todos/${page - 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Previous
            </Link>
          )}

          {page + 1 < Math.ceil(count / 10) && (
            <Link
              href={`/protected/todos/${page + 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default withAuthAsync(Todos)
