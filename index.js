import { AbilityBuilder, createMongoAbility } from "@casl/ability";

const defineAbility = (user = {}) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.isAdmin) {
    can("manage", "all");
  } else {
    can("read", "Posts", { authorId: user.id }); // only if they own it
  }

  return build();
};

const user = {
  isAdmin: false,
};

const ability = defineAbility(user);

const isAllowed = ability.can("read", "Posts");

isAllowed;

/**
 * Admins can do anything
 * Non-admin can:
 * - Read any Post
 * - Edit Post they OWN
 */

/**
 * Admins can do anything
 * - E.g can publish Posts
 * Non-admins:
 * - Can read any Post
 * - Can edit Post Content that they own
 * - Cannot publish a POST
 */

/**
 * Admins can do anything
 *  - E.g can publish/delete Posts
 * Non-admins:
 * - Can read any Post
 * - Can edit Post CONTENT that they OWN
 * - CANNOT publish a POST
 * - NEW: cannot delete any Post
 */
