
// Import package tên gql trong dependency tên apollo-boost
// để hỗ trợ viết các query theo cú pháp graphql query
import { gql } from 'apollo-boost';

// Phần Query liên quan đến các post
// Export đối tượng này để có thể sử dụng trong store.js
export const GET_POSTS = gql`
                            query {
                                getPosts {
                                    _id
                                    title
                                    imageUrl
                                }
                            }
                            `

